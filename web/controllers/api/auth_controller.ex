defmodule App.Api.AuthController do
  use App.Web, :controller

  alias App.User

  def index(conn, _params) do
    case Guardian.Plug.current_resource(conn) do
      nil ->
        conn
        |> put_status(:unauthorized)
        |> redirect(to: "/login")
      user ->
        render(conn, App.Api.UserView, "user.json", user: user)
    end
  end

  def create(conn, %{"user" => %{"login" => login, "password" => password}}) do
    case User.authenticate(login, password) do
      {:ok, user} ->
        {:ok, jwt, _claims} = Guardian.encode_and_sign(user)
        render(conn, "auth.json", user: user, token: jwt)
      {:error, reason} ->
        conn
        |> put_status(:bad_request)
        |> render("unauthorized.json", reason: reason)
    end
  end
end
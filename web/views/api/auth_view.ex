defmodule App.Api.AuthView do
  use App.Web, :view

  def render("unauthorized.json", %{reason: reason}) do
    %{"reason" => reason}
  end

  def render("auth.json", %{user: user, token: token}) do
    %{
      user: render_one(user, App.Api.UserView, "user.json"),
      token: token
    }
  end
end

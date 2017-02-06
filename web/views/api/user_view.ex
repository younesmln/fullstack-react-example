defmodule App.Api.UserView do
  use App.Web, :view

  def render("index.json", %{users: users}) do
    %{data: render_many(users, App.Api.UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, App.Api.UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email
    }
  end
end

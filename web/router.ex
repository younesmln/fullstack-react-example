defmodule App.Router do
  use App.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug Guardian.Plug.VerifyHeader, realm: "Bearer"
    plug Guardian.Plug.LoadResource
  end

  #scope "/", App do
  #  pipe_through :browser # Use the default browser stack
  #end

  # Other scopes may use custom stacks.
  scope "/api", App.Api do
    pipe_through :api
    resources "/users", UserController, except: [:new, :edit]
    resources "/auth", AuthController, only: [:create, :index]
  end

  scope "/", App do
    pipe_through :browser
    get "/*path", PageController, :index
  end
end

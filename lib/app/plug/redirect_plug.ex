defmodule App.RedirectPlug do
  import Plug.Conn

  def init(opts), do: opts

  def call(%Plug.Conn{request_path: path} = conn, _opts) do
    headers = Enum.join(get_req_header(conn, "content-type"), "")
    unless path == "/" do
      case String.contains?(headers, "application/json") do
        true -> conn
        _ -> Phoenix.Controller.redirect(conn, to: "/") |> halt
      end
    end
    conn
  end
end
defmodule App.AuthControllerTest do
  use App.ConnCase

  alias App.User

  @valid_attrs %{email: "some@content.com", name: "somecontent", password: "somontent", username: "someo_-ntent"}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "login with valid credentials should return the user with a token", %{conn: conn} do
    params = %{login: @valid_attrs.email, password: @valid_attrs.password}
    {:ok, user} = User.insert(@valid_attrs)
    conn = post(conn, auth_path(conn, :create), user: params)
    user = Repo.get!(User, user.id)
    userId = user.id
    assert %{"token" => _, "user" => %{"id" => ^userId}} = json_response(conn, 200)["data"]
  end

  test "login with invalid user should return not found", %{conn: conn} do
    params = %{login: @valid_attrs.email, password: @valid_attrs.password}
    conn = post(conn, auth_path(conn, :create), user: params)
    assert %{"reason" => "not_found"} = json_response(conn, 200)
  end

  test "login with invalid passwors should return unauthorized", %{conn: conn} do
    params = %{login: @valid_attrs.email, password: @valid_attrs.password <> "?"}
    {:ok, user} = User.insert(@valid_attrs)
    conn = post(conn, auth_path(conn, :create), user: params)
    assert %{"reason" => "unauthorized"} = json_response(conn, 200)
  end
end
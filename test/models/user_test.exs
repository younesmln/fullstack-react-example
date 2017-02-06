defmodule App.UserTest do
  use App.ModelCase

  alias App.User

  @valid_attrs %{email: "some@content.com", name: "some content", password: "some content", username: "some_content-"}
  @invalid_attrs %{}
  @invalid_password "test"

  test "changeset with valid attributes" do
    changeset = User.changeset(%User{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = User.changeset(%User{}, @invalid_attrs)
    refute changeset.valid?
  end

  test "calling authenticate with Not present user should return {:not_found}" do
    result = User.authenticate(@valid_attrs.email, @valid_attrs.password)
    assert result == {:error, :not_found}
  end

  test "calling authenticate with user and invalid password should return {:error, :unauthorized}" do
    User.insert(@valid_attrs)
    result = User.authenticate(@valid_attrs.email, @invalid_password)
    assert result == {:error, :unauthorized}
  end

  test "calling authenticate with valid user and valid password should return {:ok, user}" do
    User.insert(@valid_attrs)
    result = User.authenticate(@valid_attrs.email,@valid_attrs.password)
    assert {:ok, %User{}} = result
  end
end

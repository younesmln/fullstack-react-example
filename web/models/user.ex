defmodule App.User do
  use App.Web, :model
  import Comeonin.Bcrypt, only: [hashpwsalt: 1, checkpw: 2, dummy_checkpw: 0]

  @email_regex ~r/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
  @username_regex ~r/\A[a-zA-Z0-9_\-]+\z/
  @name_regex ~r/\A[a-zA-Z]+\z/

  schema "users" do
    field :name, :string
    field :username, :string
    field :email, :string
    field :password_digest, :string
    field :password, :string, virtual: true

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :username, :email, :password])
    |> validate_required([:name, :username, :email, :password])
    |> validate_format(:email, @email_regex)
    |> validate_format(:username, @username_regex)
    |> validate_format(:name, @name_regex)
    |> validate_length(:password, min: 4)
    |> unique_constraint(:email)
    |> unique_constraint(:username)
    |> hash_password()
  end

  defp hash_password(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true} ->
        encrypted_pass = hashpwsalt(get_change(changeset, :password))
        put_change(changeset, :password_digest, encrypted_pass)
      _ ->
        changeset
    end
  end

  def authenticate(login, pass) do
    user = Repo.one(
      from u in __MODULE__,
      where: u.username == ^login or u.email == ^login
    )
    cond do
      user && checkpw(pass, user.password_digest) -> {:ok, user}
      user -> {:error, :unauthorized}
      true ->
        # brute force attacks
        dummy_checkpw()
        {:error, :not_found}
    end
  end

  def insert(params) do
    changeset = App.User.changeset(%__MODULE__{}, params)
    Repo.insert(changeset)
  end
end

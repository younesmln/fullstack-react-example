# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :app,
  ecto_repos: [App.Repo]

# Configures the endpoint
config :app, App.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "a1uql5tyzKmHmmFpycDNzbYGgQWyTkRTY/t/v9glssh2o2dWBgzMcWVwIhZkH7Ri",
  render_errors: [view: App.ErrorView, accepts: ~w(html json)],
  pubsub: [name: App.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :guardian, Guardian,
  issuer: "App",
  ttl: { 1, :days },
  allowed_drift: 2000,
  verify_issuer: true, # optional
  secret_key: "wali-radwa",
  serializer: App.GuardianSerializer

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"

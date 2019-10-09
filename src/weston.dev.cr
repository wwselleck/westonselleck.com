require "http/server"
require "path"


module Router
  abstract class Route
    abstract def method() : String
    abstract def path() : String
    abstract def handle(context : HTTP::Server::Context, params : URLParams)

    def handle(context : HTTP::Server::Context)
      url_params = Router.extract_url_params(path, context.request.path)
      handle(context, url_params)
    end
  end

  alias URLParams = Hash(String, String)

  def self.matches?(route : Route, request : HTTP::Request)
    if request.method != route.method
      return false
    end

    route_path_parts = route.path.split('/')
    request_path_parts = request.path.split('/')

    if route_path_parts.size != request_path_parts.size
      return false
    end

    zipped_paths = route_path_parts.zip(request_path_parts)
    zipped_paths.each do | route_path_part, request_path_part |
      if route_path_part != request_path_part && !route_path_part.starts_with?(':')
        return false
      end
    end
    true
  end

  def self.extract_url_params(routePath : String, requestPath : String)
    route_path_parts = routePath.split('/')
    request_path_parts = requestPath.split('/')

    if route_path_parts.size != request_path_parts.size
      raise "Cannot extract url params from paths of different length"
    end

    params = {} of String => String

    zipped_paths = route_path_parts.zip(request_path_parts)
    zipped_paths.each do | route_path_part, request_path_part |
      if route_path_part.starts_with?(':')
        param_without_colon = route_path_part[1..]
        params[param_without_colon] = request_path_part
      end
    end

    params
  end
end

class Index < Router::Route
  getter method = "GET"
  getter path = "/x/:idMember"

  def handle(context, url_params : Router::URLParams)
    p url_params
    context.response.print "Index!"
  end
end


class SiteHandler
  include HTTP::Handler

  def initialize(@routes : Array(Router::Route))
  end

  def call(context)
    @routes.each do |route|
      if Router.matches?(route, context.request)
        route.handle context
      end
    end
  end
end

server = HTTP::Server.new([
  HTTP::ErrorHandler.new,
  HTTP::LogHandler.new,
  SiteHandler.new([
    Index.new
  ] of Router::Route)
])

address = server.bind_tcp "0.0.0.0", 8080

server.listen

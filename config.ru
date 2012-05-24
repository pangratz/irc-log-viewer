require 'rake-pipeline'
require 'rake-pipeline/middleware'
use Rake::Pipeline::Middleware, 'Assetfile'

require 'rack/streaming_proxy'
use Rack::StreamingProxy do |request|
   if request.path.start_with?('/irc')
     "http://127.0.0.1:5984#{request.path}?#{request.query_string}"
   end
end

require 'rack-rewrite'
use Rack::Rewrite do
  rewrite %r{^(.*)\/$}, '$1/index.html'
end

run Rack::Directory.new('.')

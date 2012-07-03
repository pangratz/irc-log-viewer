APPNAME = 'irc'

require "bundler/setup"
require 'rake-pipeline'
require 'colored'

desc "Build #{APPNAME}"
task :build => :clean do
  Rake::Pipeline::Project.new('Assetfile').invoke
end

desc "Build #{APPNAME}"
task :clean do
  Rake::Pipeline::Project.new('Assetfile').clean
end


desc "Run tests with PhantomJS"
task :test => :build do
  unless system("which phantomjs > /dev/null 2>&1")
    abort "PhantomJS is not installed. Download from http://phantomjs.org/"
  end

  cmd = "phantomjs tests/qunit/run-qunit.js \"file://#{File.dirname(__FILE__)}/tests/index.html\""

  # Run the tests
  puts "Running #{APPNAME} tests"
  success = system(cmd)

  if success
    puts "Tests Passed".green
  else
    puts "Tests Failed".red
    exit(1)
  end
end

desc "Automatically run tests (Mac OS X only)"
task :autotest do
  system("kicker -e 'rake test' app")
end

task :default => :test
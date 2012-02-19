task :default => [:deploy]

task :deploy do
  puts `cd _attachments && bpm rebuild && cd ..`
  puts `couchapp push prod`
end
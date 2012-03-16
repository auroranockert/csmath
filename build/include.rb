require 'erb'

def file(file, type = :raw)
  INCLUDES.each do |path|
    f = File.read("#{path}/#{file}") rescue nil
    
    case type
    when :raw
      return f
    when :erb
      template = ERB.new f
      
      template.filename = file
      
      return template.result(binding)
    end if f
  end
  
  throw "Could not find file '#{file}' in paths"
end

file_location = "short_data_english.txt"
language = "english"


f = open(file_location, 'r', encoding='UTF8' )
fw = open("short_data_{0}.sql".format(language), 'w')

while True:
    line = f.readline()
    line = line.strip()
    if not line: break
    
    data = '''INSERT INTO TYPING (CONTENT, CONTENT_TYPE, LANGUAGE, LENGTH, VIEW_COUNT) VALUES ('{0}', false, '{1}', {2}, 0);'''.format(line, language, len(line))
    fw.write(data.encode('unicode_escape').decode('utf-8') + '\n')

f.close()
fw.close()
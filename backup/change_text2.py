import os
names = os.listdir(path=None)
for i in range(len(names)):
    dot = False
    for j in names[i]:
        if j == '.':
            dot = True
    if dot == False and (names[i] != 'backup' and names[i] != 'jsphp' and names[i] != 'font' and names[i] != 'islam' and names[i] != 'extra' and names[i] != "reuseproof" and names[i] != "__pycache__"):
        insideFile = (os.listdir(path = names[i]))
        for m in range(len(insideFile)):
            if ".html" in insideFile[m]:
                file = open(names[i] + "/" + insideFile[m], "r")
                text = file.read()
                file.close()
                text = text.replace('<p class="plink">','<p>')
                file = open(names[i] + "/" + insideFile[m], "w")
                file.write(text)
                file.close()

import os
names = os.listdir(path=None)
counter = 0
for i in range(len(names)):
    dot = False
    for j in names[i]:
        if j == '.':
            dot = True
    if dot == False and (names[i] != 'backup' and names[i] != 'font' and names[i] != 'jsphp' and names[i] != 'islam' and names[i] != 'extra' and names[i] != "reuse proof" and names[i] != "__pycache__"):
        for m in range(len(os.listdir(names[i]))):
            if "." not in os.listdir(names[i])[m]:
                listOfFiles = os.listdir(names[i] + '/' + os.listdir(names[i])[m])
                for n in range(len(listOfFiles)):
                    if ".html" in listOfFiles[n]:
                        try:
                            filePath = names[i] + '/' + os.listdir(names[i])[m] + '/' + listOfFiles[n]
                            file = open(filePath, 'r')
                            text = file.read()
                            file.close()
                            doCon = False
                            addTitle = False
                            result = ""
                            title = ""
                            for k in range(len(text)-4):
                                try:
                                    if (text[k+1] == "<" and text[k+2] == 'T' and text[k+3] == "I"):
                                        doCon = True
                                    try:
                                        if (text[k-1] == ">" and text[k-2] == '1' and text[k-3] == "h"):
                                            addTitle = True
                                        if (text[k] == "<" and text[k+1] == '/' and text[k+2] == "h" and addTitle == True):
                                            addTitle = False
                                    except:
                                        pass
                                    if addTitle == True:
                                        title += text[k]
                                    result += (text[k])
                                except:
                                    pass
                            if doCon == True:
                                continue
                            result += "TML>"
                            result = result.replace("","")
                            file = open(filePath, 'w')
                            file.write(result)
                            counter += 1
                            file.close()
                        except:
                            print("Error: " + filePath)

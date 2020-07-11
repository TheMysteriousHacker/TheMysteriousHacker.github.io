import os
from time import *
titles = ['','','','']
tValue = ['','','','']
times = [0,0,0,0]
titles2 = ['','','','']
tValue2 = ['','','','']
times2 = [0,0,0,0]
tempS = ""
tempN = 0
names = os.listdir(path=None)
for i in range(len(names)):
    dot = False
    for j in names[i]:
        if j == '.':
            dot = True
    if dot == False and names[i] != 'backup' and names[i] != 'jsphp' and names[i] != 'islam' and names[i] != 'extra' and names[i] != 'pictures' and names[i] != 'font' and names[i] != "reuse proof" and names[i] != "__pycache__":
        insideFile = (os.listdir(path = names[i]))
        for k in range(len(insideFile)):
            if "." not in insideFile[k]:
                mainFiles = (os.listdir(path = names[i] + '/' + insideFile[k]))
                for f in range(len(mainFiles)):
                    if ".html" in mainFiles[f]:
                        filePath = names[i] + '/' + insideFile[k] + '/' + mainFiles[f]
                        addstat = int(os.stat(filePath)[9])
                        if addstat > times[3]:
                            times[3] = addstat
                            titles[3] = filePath
                        if times[3] > times[2]:
                            tempN = times[2]
                            times[2] = times[3]
                            times[3] = tempN
                            tempS = titles[2]
                            titles[2] = titles[3]
                            titles[3] = tempS
                        if times[2] > times[1]:
                            tempN = times[1]
                            times[1] = times[2]
                            times[2] = tempN
                            tempS = titles[2]
                            titles[2] = titles[1]
                            titles[1] = tempS
                        if times[1] > times[0]:
                            tempN = times[1]
                            times[1] = times[0]
                            times[0] = tempN
                            tempS = titles[0]
                            titles[0] = titles[1]
                            titles[1] = tempS
                        addstat = int(os.stat(filePath)[8])
                        if addstat > times2[3]:
                            times2[3] = addstat
                            titles2[3] = filePath
                        if times2[3] > times2[2]:
                            tempN = times2[2]
                            times2[2] = times2[3]
                            times2[3] = tempN
                            tempS = titles2[2]
                            titles2[2] = titles2[3]
                            titles2[3] = tempS
                        if times2[2] > times2[1]:
                            tempN = times2[1]
                            times2[1] = times2[2]
                            times2[2] = tempN
                            tempS = titles2[2]
                            titles2[2] = titles2[1]
                            titles2[1] = tempS
                        if times2[1] > times2[0]:
                            tempN = times2[1]
                            times2[1] = times2[0]
                            times2[0] = tempN
                            tempS = titles2[0]
                            titles2[0] = titles2[1]
                            titles2[1] = tempS

w1 = False
for m in range(len(titles)):
    file = open(titles[m], "r")
    text = file.read()
    file.close()
    for n in range(len(text)-100):
        try:
            if text[n-1] == ">" and text[n-2] == "E" and text[n-3] == "L" and text[n-7] == "<":
                w1 = True
            if text[n] == "<" and w1 == True:
                w1 = False
            if w1 == True:
                tValue[m] += text[n]
        except:
            pass
for x in range(len(titles2)):
    file = open(titles2[x], "r")
    text = file.read()
    file.close()
    for y in range(len(text)-100):
        try:
            if text[y-1] == ">" and text[y-2] == "E" and text[y-3] == "L" and text[y-7] == "<":
                w1 = True
            if text[y] == "<" and w1 == True:
                w1 = False
            if w1 == True:
                tValue2[x] += text[y]
        except:
            pass
titles = titles + titles2
tValue = tValue + tValue2
counter = 0
file = open('index.html','r')
text = file.read()
file.close()
result = ''
write = False
write2 = False
for i in range(len(text)):
    try:
        if text[i-10:i]== 'tableadded':
            write = True
        if text[i:i+12]== '\n\n<!--footer':
            write = False
        if write == True:
            if text[i-6:i] == 'href="':
                write2 = True
            if text[i:i+3] == '</a':
                write2 = False
                result += titles[counter] +'">'+tValue[counter]
                counter += 1
        if write2 != True:
            result += text[i]
    except:
        pass
file = open('index.html','w')
file.write(result)
file.close()

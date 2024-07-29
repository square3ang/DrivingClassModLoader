with open("dcmlassets", "rb") as r:
    with open("dcmlassets.js", "w") as w:
        string = ""
        string += "export const dcmlassets = ["
        for data in r.read():
            string += str(int(data)) + ", "
        string += "];"
        w.write(string)

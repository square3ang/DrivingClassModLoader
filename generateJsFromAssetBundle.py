with open("dcmlassets", "rb") as r:
    with open("dcmlassets.ts", "w") as w:
        string = ""
        string += "export const dcmlassets = ["
        for data in r.read():
            string += str(int(data)) + ", "
        string += "];"
        w.write(string)

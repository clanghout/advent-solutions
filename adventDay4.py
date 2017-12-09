with open("input/input4.txt") as f:
    inp = f.readlines()

inp = map(lambda x: x.split(" "), inp)
total = 0
totalA = 0


def hasDupe(i, tot):
    for w in xrange(0, len(i)):
        for cw in xrange(w + 1, len(i)):
            if (i[w] == i[cw]):
                return tot + 1
    return tot


# edge case w1 = "aa" w2 = "ab"
def isAnag(w1, w2):
    if len(w1) != len(w2):
        return False
    res = w2
    for c in w1:
        res = res.replace(c, "")
    if res == "":
        return True
    return False


def hasDupeAnag(i, tot):
    for w in xrange(0, len(i)):
        for cw in xrange(w + 1, len(i)):
            if (isAnag(i[w], i[cw])):
                return tot + 1
    return tot


for i in inp:
    i = map(lambda x: x.replace("\n", ""), i)
    total = hasDupe(i, total)
    totalA = hasDupeAnag(i, totalA)

print("{} valid passphrases dupe".format(len(inp) - total))
print("{} valid passphrases anag".format(len(inp) - totalA))

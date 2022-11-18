import json
def fun(x):
    # pass
    ret = {'x':123456}
    print(json.dumps(ret))
pid = input()
fun(pid) 
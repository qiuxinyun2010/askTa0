__all__ = ['m']

# Don't look below, you will not understand this Python code :) I don't.

from js2py.pyjs import *
# setting scope
var = Scope( JS_BUILTINS )
set_global_object(var)

# Code follows:
var.registers([])
@Js
def PyJs_anonymous_0_(x, this, arguments, var=var):
    var = Scope({'x':x, 'this':this, 'arguments':arguments}, var)
    var.registers(['x'])
    var.get('console').callprop('log', (var.get('x')+Js(1.0)))
PyJs_anonymous_0_._set_name('anonymous')
var.get('exports').put('a', PyJs_anonymous_0_)


# Add lib to the module scope
m = var.to_python()
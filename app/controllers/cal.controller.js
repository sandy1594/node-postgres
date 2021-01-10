module.exports.callcm = function (req, res, next) {

	
	var a = req.query.a;
	var b = req.query.b;

	var result = {};
	if(isNaN(a + '') || isNaN(b + ''))
	{	
		result = {
			result: "Not a number"
		}
		res.type('json');
		res.send(JSON.stringify(result));
		return;
	}
	a = parseFloat(a);
	b = parseFloat(b);
	
	result = (a > b) ? a : b;

    // while loop
    while (true) {
        if (result% a == 0 && result% b == 0) {
           
            break;
        }
        result++;
    }
	res.type('json');
	res.send(JSON.stringify({
		result: result
	}));

	return;
}
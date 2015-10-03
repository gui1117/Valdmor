var parseXml = function (xml, arrayTags)
{
	var dom = null;
//	if (window.DOMParser)
//	{
//		dom = (new DOMParser()).parseFromString(xml, "text/xml");
//	}
//	else if (window.ActiveXObject)
//	{
//		dom = new ActiveXObject('Microsoft.XMLDOM');
//		dom.async = false;
//		if (!dom.loadXML(xml))
//		{
//			throw dom.parseError.reason + " " + dom.parseError.srcText;
//		}
//	}
//	else
//	{
//		throw "cannot parse xml string!";
//	}

	var xhttp;
	if (window.XMLHttpRequest)
	{
		xhttp = new XMLHttpRequest();
	}
	else // code for IE5 and IE6
	{
		xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhttp.open("GET","map.svg",false);
	xhttp.send();
	var dom = xhttp.responseXML; 

	function isArray(o)
	{
		return Object.prototype.toString.apply(o) === '[object Array]';
	}

	function parseNode(xmlNode, result)
	{
		if(xmlNode.nodeName == "#text" && xmlNode.nodeValue.trim() == "")
		{
			return;
		}

		var jsonNode = {};
		var existing = result[xmlNode.nodeName];
		if(existing)
		{
			if(!isArray(existing))
			{
				result[xmlNode.nodeName] = [existing, jsonNode];
			}
			else
			{
				result[xmlNode.nodeName].push(jsonNode);
			}
		}
		else
		{
			if(arrayTags && arrayTags.indexOf(xmlNode.nodeName) != -1)
			{
				result[xmlNode.nodeName] = [jsonNode];
			}
			else
			{
				result[xmlNode.nodeName] = jsonNode;
			}
		}

		if(xmlNode.attributes)
		{
			var length = xmlNode.attributes.length;
			for(var i = 0; i < length; i++)
			{
				var attribute = xmlNode.attributes[i];
				jsonNode[attribute.nodeName] = attribute.nodeValue;
			}
		}

		var length = xmlNode.childNodes.length;
		for(var i = 0; i < length; i++)
		{
			parseNode(xmlNode.childNodes[i], jsonNode);
		}
	}

	var result = {};
	if(dom.childNodes.length)
	{
		parseNode(dom.childNodes[0], result);
	}

	return result;
}

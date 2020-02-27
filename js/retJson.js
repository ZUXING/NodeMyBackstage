module.exports = function(status,explanation,sqlStatement){//returnJson
	return '[{"status":"' + status + '","explanation":"' + explanation + '","sqlStatement":"' + sqlStatement + '"}]'
}
export function format_date(timestamp,fmt){
	let date = new Date(timestamp);
	let year = date.getFullYear();
	if(/(y+)/.test(fmt)){
		fmt = fmt.replace( RegExp.$1, (year+'').substring( 4 - RegExp.$1.length ) )
	}
	let obj = {
		'M+':date.getMonth() + 1,
		'd+':date.getDate(),
		'h+':date.getHours(),
		'm+':date.getMinutes()
	}
	for(let key in obj){
		if( new RegExp( '(' + key + ')' ).test(fmt) ) {
			fmt = fmt.replace( RegExp.$1, RegExp.$1.length == 1 ? obj[key] : paddingLeftZero(obj[key]) )
		}
	}
	return fmt;
}

function paddingLeftZero(str){
	str = str + '';
	return ( '00' + str ).substring(str.length);
}
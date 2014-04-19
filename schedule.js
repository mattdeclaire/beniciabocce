jQuery(function($) {
	var key = '1HJP6Ws5T5zQ4F6QW3UGrJb_Cj8VlsAcugxt8xFIpO7s',
		url = 'https://spreadsheets.google.com/feeds/list/' + key + '/od6/public/basic?alt=json';

	$.getJSON(url, function(data) {
		var games = $.map(data.feed.entry, function(entry) {
			var cells = $.map(entry.content['$t'].split(','), function(cell) {
				return cell.replace(/^.*: /, '');
			});

			return {
				time: entry.title['$t'],
				court: cells[0] || '-',
				home: cells[1] || '-',
				visitor: cells[2] || '-'
			};
		});

		var html = '<table>';

		html += '<tr>';
		html += '<th>time<th>';
		html += '<th>court<th>';
		html += '<th>home<th>';
		html += '<th>visitor<th>';
		html += '</tr>';

		$.each(games, function(ndx, game) {
			html += '<tr>';
			html += '<td>' + game.time + '<td>';
			html += '<td>' + game.court + '<td>';
			html += '<td>' + game.home + '<td>';
			html += '<td>' + game.visitor + '<td>';
			html += '</tr>';
		});

		html += '</table>';

		$('#bocce-schedule').html(html);
	});
});

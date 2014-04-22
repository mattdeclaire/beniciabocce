(function($) {
	var key = '1HJP6Ws5T5zQ4F6QW3UGrJb_Cj8VlsAcugxt8xFIpO7s';

	$.fn.schedule = function(sheet) {
		return this.each(function() {
			var $el  = $(this).html('<div class="loading">loading...</div>'),
				url = 'https://spreadsheets.google.com/feeds/list/' + key + '/' + sheet + '/public/basic?alt=json';

			$.getJSON(url, function(data) {
				var games = getGames(data),
					html = scheduleHtml(games);

				$el.html(html);
			});

		});
	};

	function getGames(data) {
		var games = $.map(data.feed.entry, function(entry) {
			var cells = $.map(entry.content.$t.split(','), function(cell) {
				return cell.replace(/^.*: /, '');
			});

			return {
				time: entry.title.$t,
				court: cells[0],
				home: cells[1],
				visitor: cells[2]
			};
		});

		return games;
	}

	function scheduleHtml(games) {
		var html = '<table>';

		html += '<tr>';
		html += '<th class="time">date / time</th>';
		html += '<th class="court">court</th>';
		html += '<th class="home">home</th>';
		html += '<th class="visitor">visitor</th>';
		html += '</tr>';

		$.each(games, function(ndx, game) {
			if (!game.home) return;

			html += '<tr>';
			html += '<td class="time">' + game.time + '</td>';
			html += '<td class="court">' + game.court + '</td>';
			html += '<td class="home">' + game.home + '</td>';
			html += '<td class="visitor">' + game.visitor + '</td>';
			html += '</tr>';
		});

		html += '</table>';

		return html;
	}
})(jQuery);
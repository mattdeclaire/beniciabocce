(function($) {
	var key = '1HJP6Ws5T5zQ4F6QW3UGrJb_Cj8VlsAcugxt8xFIpO7s',
		sheet = '2096572205',
		$el = $('#bocce-schedule'),
		url = 'https://spreadsheets.google.com/feeds/list/' + key + '/' + sheet + '/public/basic?alt=json';

	$el.html('<div class="loading">loading...</div>');

	$.getJSON(url, function(data) {
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

		var teams = [];
		$.each(games, function(ndx, game) {
			if ($.inArray(game.home, teams) == -1) teams.push(game.home);
			if ($.inArray(game.visitor, teams) == -1) teams.push(game.visitor);
		});
		teams.sort();

		var html = '';

		html += '<div class="team-select">';
		html += '<select>';
		html += '<option value="">choose a team</option>';
		$.each(teams, function(ndx, team) {
			html += '<option value="' + ndx + '">' + team + '</option>';
		});
		html += '</select>';

		html += '<table>';
		html += '</div>';

		html += '<tr>';
		html += '<th class="time">date / time</th>';
		html += '<th class="court">court</th>';
		html += '<th class="home">home</th>';
		html += '<th class="visitor">visitor</th>';
		html += '</tr>';

		$.each(games, function(ndx, game) {
			if (!game.home) return;

			var homeTeamNdx = $.inArray(game.home, teams),
				visitorTeamNdx = $.inArray(game.visitor, teams);

			html += '<tr>';
			html += '<td class="time">' + game.time + '</td>';
			html += '<td class="court">' + game.court + '</td>';
			html += '<td class="home team team-' + homeTeamNdx + '">' + game.home + '</td>';
			html += '<td class="visitor team team-' + visitorTeamNdx + '">' + game.visitor + '</td>';
			html += '</tr>';
		});

		html += '</table>';

		$el.html(html);

		var teamRows = $el.find('tr'),
			teamCells = $el.find('.team');

		$el.find('.team-select select').change(function() {
			var ndx = $(this).val();

			teamRows.removeClass('chosen');
			teamCells.removeClass('chosen');

			if (ndx) {
				$el
					.find('.team-' + ndx)
					.addClass('chosen')
					.closest('tr')
					.addClass('chosen');
			}
		});
	});
})(jQuery);
'use strict';

function getHTML(command) {
    if (window.XMLHttpRequest) {
        var http = new XMLHttpRequest();
        http.open(command, $('#urlinput').val(), true);
        http.onreadystatechange = function() {
            if(http.readyState === 4) {
                if(http.status === 200) {
                    $('#answer').html(JSON.stringify(JSON.parse(http.responseText), null, '    '));
                }
                else {
                    $('#answer').html('Error ' + http.status);
                }

                $('pre code').each(function(i, block) {
                  hljs.highlightBlock(block);
                });
            }
        };

        http.send(document.commandform.messagebody.value);
    }
    return false;
}

var apiList = [
    '{ }',
    '{ "cn_user": "USERNAME", "cn_pass": "PASSWORD", "action": "get_home" }',
    '{ "cn_user": "USERNAME", "cn_pass": "PASSWORD", "action": "get_state", "inputs": ["input_0"], "outputs": ["output_0", "output_1"], "audio_players": ["0"] }',
    '{ "cn_user": "USERNAME", "cn_pass": "PASSWORD", "action": "get_io", "inputs": ["input_0"], "outputs": ["output_0", "output_1"] }',
    '{ "cn_user": "USERNAME", "cn_pass": "PASSWORD", "action": "set_state", "type": "output", "id": "output_0", "value": "true" }',
    '{ "cn_user": "USERNAME", "cn_pass": "PASSWORD", "action": "set_state", "type": "input", "id": "input_0", "value": "true" }',
    '{ "cn_user": "USERNAME", "cn_pass": "PASSWORD", "action": "set_state", "type": "audio", "player_id": "0", "value": "volume 75" }',
    '{ "cn_user": "USERNAME", "cn_pass": "PASSWORD", "action": "set_state", "type": "camera", "camera_id": "0", "camera_action": "move", "value": "left" }',
    '{ "cn_user": "USERNAME", "cn_pass": "PASSWORD", "action": "get_playlist", "player_id": "0" }',
    '{ "cn_user": "USERNAME", "cn_pass": "PASSWORD", "action": "poll_listen", "type": "register" }',
    '{ "cn_user": "USERNAME", "cn_pass": "PASSWORD", "action": "poll_listen", "type": "unregister", "uuid": "XXX" }',
    '{ "cn_user": "USERNAME", "cn_pass": "PASSWORD", "action": "poll_listen", "type": "get", "uuid": "XXX" }',
    '{ "cn_user": "USERNAME", "cn_pass": "PASSWORD", "action": "config", "type": "get" }',
    '{ "cn_user": "USERNAME", "cn_pass": "PASSWORD", "action": "config", "type": "put", "config_files": { "io.xml": "<xml ...... >", "rules.xml": "<xml ...... >" } }',
    '{ "cn_user": "USERNAME", "cn_pass": "PASSWORD", "action": "audio_db", "audio_action": "get_stats", "player_id": "0" }',
    '{ "cn_user": "USERNAME", "cn_pass": "PASSWORD", "action": "audio", "audio_action": "get_playlist_size", "player_id": "0" }',
    '{ "cn_user": "USERNAME", "cn_pass": "PASSWORD", "action": "audio", "audio_action": "get_time", "player_id": "0" }',
    '{ "cn_user": "USERNAME", "cn_pass": "PASSWORD", "action": "audio", "audio_action": "get_playlist_item", "item": "0", "player_id": "0" }',
    '{ "cn_user": "USERNAME", "cn_pass": "PASSWORD", "action": "audio_db", "audio_action": "get_albums", "from": "0", "count": "1", "player_id": "0" }',
    '{ "cn_user": "USERNAME", "cn_pass": "PASSWORD", "action": "audio_db", "audio_action": "get_artists", "from": "0", "count": "1", "player_id": "0" }',
    '{ "cn_user": "USERNAME", "cn_pass": "PASSWORD", "action": "audio_db", "audio_action": "get_artist_album", "from": "0", "count": "1", "artist_id": "0", "player_id": "0" }',
    '{ "cn_user": "USERNAME", "cn_pass": "PASSWORD", "action": "audio_db", "audio_action": "get_year_albums", "from": "0", "count": "1", "year": "0", "player_id": "0" }',
    '{ "cn_user": "USERNAME", "cn_pass": "PASSWORD", "action": "audio_db", "audio_action": "get_genre_artists", "from": "0", "count": "1", "genre": "0", "player_id": "0" }',
    '{ "cn_user": "USERNAME", "cn_pass": "PASSWORD", "action": "audio_db", "audio_action": "get_album_titles", "from": "0", "count": "1", "album_id": "0", "player_id": "0" }',
    '{ "cn_user": "USERNAME", "cn_pass": "PASSWORD", "action": "audio_db", "audio_action": "get_playlist_titles", "from": "0", "count": "1", "playlist_id": "0", "player_id": "0" }',
];

$(document).ready(function() {
    var i = 0;

    $('#api_list').append($('<option />').val(i++).html('Custom request'));
    for (var c = 1;c < apiList.length;c++) {
        var s = JSON.parse(apiList[c]).action;
        if (s == "set_state" || s == "poll_listen" || s == "config")
	    s = s + " " + JSON.parse(apiList[c]).type;
	if (s == "audio" || s == "audio_db")
	    s = s + " " + JSON.parse(apiList[c]).audio_action;

        $('#api_list').append($('<option />').val(i++).html(s));
    }

    $('#api_list').change(function() {
        var j = $('#api_list option:selected').val();
        var s = apiList[parseInt(j)];
        if ($('#username').val() != "")
            s = s.replace("USERNAME", $('#username').val());
        if ($('#passwd').val() != "")
            s = s.replace("PASSWORD", $('#passwd').val());
        $('#message').val(JSON.stringify(JSON.parse(s), null, '    '));
    });
});

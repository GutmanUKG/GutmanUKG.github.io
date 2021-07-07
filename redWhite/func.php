<?php
    function printArr($arr){
        echo '<pre>';
        print_r($arr);
        echo '</pre>';
    }

    function addName(){
        $lines = file('http://onair.radio1922.ru:8000/status.xsl');
        $trimmed = file('somefile.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        $str =  strstr($lines[9], 'Current Song:');
        $res = explode('<td>', $str);    
		$song = explode("-", $res[0]);
		$autor = explode(":", $song[0]);
		unset($autor[0]);
		$resultName = $autor[1];	
		$resultSong =  $song[1];
        
        strip_tags($resultName);
        
		return [$resultName, $resultSong];
    }

 
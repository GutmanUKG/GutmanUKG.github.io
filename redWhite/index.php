<?
	include 'func.php';		
	$result = addName();
?>


<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/bootstrap-reboot.min.css">
    <link rel="stylesheet" href="./css/bootstrap.min.css">
    <link rel="stylesheet" href="./css/slick.css">


    <link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@700;900&display=swap" rel="stylesheet"> 
    <link rel="stylesheet" href="./css/style.min.css">
    <title>Красно Белая Волна</title>
</head>
<body>
    <header>
        <div class="container">
            <div class="row header d-flex justify-content-between">
                <div class="col-2">
                    <a href="#" class="header__logo">
                        <img src="./img/logo.png" alt="logo">
                    </a>
                </div>
                <div class="col-6">
                    <div class="header_player">
                        <audio controls="" autoplay="false" name="media" class='strim_audio'>
							<source src="http://onair.radio1922.ru:8000/192.mp3" type="audio/mpeg">
						</audio>
                        <a href="#" class="play_ico">
                            <img src="./img/paly_ico.png" alt="play" class='play'>
                            <img src="./img/pause-button.png" alt="pause" class='pause'>
                        </a>
                        <div class="header_player_info">
                            <div class="name">
								<?
									echo strip_tags($result[0]);
								?>
                            </div>
                            <div class="info">
							
								<?
									echo strip_tags($result[1]);
								?>
								
                            </div>
                        </div>
                        <a href="#" class="value_ico">
                            <img src="./img/value_ico.png" alt="value">
                        </a>
                    </div>
                    <div class="header_social">
                        <a href="#">
                            <img src="./img/facebook_ico.png" alt="facebook_ico">
                        </a>
                        <a href="#">
                            <img src="./img/dzen_ico.png" alt="dzen_ico">
                        </a>
                        <a href="#">
                            <img src="./img/youtube_ico.png" alt="youtube_ico">
                        </a>
                        <a href="#">
                            <img src="./img/instagram_ico.png" alt="instagram_ico">
                        </a>
                    </div>
                </div>
                <div class="col-2">
                    <div class="header_menu">
                        <ul>
                            <li>
                                <img src="./img/info_icon.png" alt="info_icon">
                                <a href="#">Наша Команда</a>
                            </li>
                            <li>
                                <img src="./img/wi_fi_ico.png" alt="wi_fi_ico">
                                <a href="#">радио</a>
                            </li>
                            <li>
                                <img src="./img/event_ico.png" alt="event_ico">
                                <a href="#">события</a>
                            </li>
                            <li>
                                <img src="./img/friend_ico.png" alt="friend_ico">
                                <a href="#">друзья</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <!--  -->

    <section class="main_slider">
        <div class="container">
            <div class="main_slider_wrapper">
                <div class="slid">
                 
                    <div class="slid_content">
                        <div class="arrow">
                            <div class="slid_prev">
                                <img src="./img/arrow.png" alt="arrow">
                            </div>
                            <div class="slid_next">
                                <img src="./img/arrow.png" alt="arrow">
                            </div>
                        </div>
                        <div class="date">
                            Дата и время
                        </div>

                        <div class="text_content">
                            <div class="title">
                                Новое событие
                            </div>
                            <div class="subtitle">
                                текст пояснения
                            </div>
                        </div>
                        <div class="img_slider">
                            <img src="./img/no-img.png" alt="">
                        </div>
                    </div>
                </div>

                <div class="slid">
                 
                    <div class="slid_content">
                        <div class="arrow">
                            <div class="slid_prev">
                                <img src="./img/arrow.png" alt="arrow">
                            </div>
                            <div class="slid_next">
                                <img src="./img/arrow.png" alt="arrow">
                            </div>
                        </div>
                        <div class="date">
                            Дата и время
                        </div>

                        <div class="text_content">
                            <div class="title">
                                Новое событие2
                            </div>
                            <div class="subtitle">
                                текст пояснения2
                            </div>
                        </div>
                        <div class="img_slider">
                            <img src="./img/no-img.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>


    <section class="banner_slider">
        <div class="container">
            <div class="banner_slider_wrapper">
                <div class="slid_content slid_content_banner">
                        
                            <div  class="slid_item">
                                <img src="./img/slid.png" alt="">
                                <div class="title">
                                    <p>
                                        Афиша
                                    </p>
                                </div>
                            </div>
                            <div class="slid_item">
                                <img src="./img/slid.png" alt="">
                                <div class="title">
                                    <p>
                                        Афиша
                                    </p>
                                </div>
                            </div>
                            <div class="slid_item">
                                <img src="./img/slid.png" alt="">
                                <div class="title">
                                    <p>
                                        Афиша
                                    </p>
                                </div>
                            </div>
                            <div class="slid_item">
                                <img src="./img/slid.png" alt="">
                                <div class="title">
                                    <p>
                                        Афиша
                                    </p>
                                </div>
                            </div>
                            <div class="slid_item">
                                <img src="./img/slid.png" alt="">
                                <div class="title">
                                    <p>
                                        Афиша
                                    </p>
                                </div>
                            </div>
                       
                </div>
            </div>
        </div>
    </section>


    <section class="video_slider">
        <div class="container">
            <div class="video_slider_wrapper">
                <div class="slid_item">
                    <img src="./img/video.png" alt="">
                </div>

                <div class="slid_item">
                    <img src="./img/video.png" alt="">
                </div>

                <div class="slid_item">
                    <img src="./img/video.png" alt="">
                </div>
            </div>
        </div>
    </section>
    <!--  -->


    <footer>
        <div class="container">
            <div class="row d-flex justify-content-between">
                <div class="col feeback offset-1">
                    <a href="#" class="adress"> россия, г. москва</a>
                    <a href="tel:+79660071922"  class="phone"> +7 (966) 007-19-22 </a>
                    <a href="mailto:info@radio1922.ru" class="mail">info@radio1922.ru</a>
                </div>
                <div class="col socials offset-2">
                    <div class="title">
                        Социальные сети
                    </div>
                    <div class="social_link">
                        <a href="">
                            <img src="./img/instagram_soc.svg" alt="">
                        </a>
                        <a href="">
                            <img src="./img/youtube_soc.svg" alt="">
                        </a>
                        <a href="">
                            <img src="./img/dzen_soc.svg" alt="">
                        </a>
                        <a href="">
                            <img src="./img/facebook_soc.svg" alt="">
                        </a>
                        <a href="">
                            <img src="./img/vk_soc.svg" alt="">
                        </a>
                    </div>
                    <div class="reiting">
                        16+
                    </div>
                </div>

            </div>
        </div>
    </footer>
    <script src="./js/jquery.min.js"></script>
    <script src="./js/slick.min.js"></script>
    <script src="./js/script.js"></script>
</body>
</html>
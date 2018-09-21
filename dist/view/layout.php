<!DOCTYPE html>
<html lang="nl">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <title>Portfolio</title>
    <link rel="stylesheet" href="css/style.css">
    <?php echo $css;?>
  </head>
  <body>
    <header>
      <nav>
        <ul class="nav-list">
         <li class="logo slide">NN</li>
         <li ><a class="about" href="">About</a></li>
        </ul>
      </nav>
      <section class="intro">
        <h1 class="intro-title"> <span class="intro-name">Nicolas Nuytten,</span>  The mix of an experimental developer & a creative designer.</h1>
        <p class="intro-status">Currently looking for an internship in Washinton DC.</p>
      </section>
    </header>
    <?php echo $content;?>
    <?php echo $js;?>
  </body>
</html>

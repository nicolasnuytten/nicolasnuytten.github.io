<main class="bg">
<h1 class="hide">Items</h1>
  <ul class="items">
  <?php foreach($items as $item): ?>
    <li class="item">
      
    <a href=""><h1 class="item-title"><?php echo $item['name']; ?></h1><img class="item-img" src="../assets/thumbnails/<?php echo $item["img"];?>.png" alt="<?php echo $item["img"];?>"></a>
  </li>
  <?php endforeach; ?>
  </ul>
</main>
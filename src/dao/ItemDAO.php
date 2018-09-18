<?php
require_once __DIR__ . '/DAO.php';
class ItemDAO extends DAO {

  public function selectAll() {
    $sql = "SELECT * FROM `items`";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }
}

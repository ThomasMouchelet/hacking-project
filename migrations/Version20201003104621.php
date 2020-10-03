<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201003104621 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE student (id INT AUTO_INCREMENT NOT NULL, first_name VARCHAR(255) DEFAULT NULL, last_name VARCHAR(255) DEFAULT NULL, secret_key VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE team DROP is_valid');
        $this->addSql('ALTER TABLE user DROP INDEX IDX_8D93D649296CD8AE, ADD UNIQUE INDEX UNIQ_8D93D649296CD8AE (team_id)');
        $this->addSql('ALTER TABLE user ADD student_id INT DEFAULT NULL, DROP first_name, DROP last_name, DROP secret_key');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649CB944F1A FOREIGN KEY (student_id) REFERENCES student (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649CB944F1A ON user (student_id)');
        $this->addSql('ALTER TABLE valid_challenge ADD student_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE valid_challenge ADD CONSTRAINT FK_5A07F35ACB944F1A FOREIGN KEY (student_id) REFERENCES student (id)');
        $this->addSql('CREATE INDEX IDX_5A07F35ACB944F1A ON valid_challenge (student_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649CB944F1A');
        $this->addSql('ALTER TABLE valid_challenge DROP FOREIGN KEY FK_5A07F35ACB944F1A');
        $this->addSql('DROP TABLE student');
        $this->addSql('ALTER TABLE team ADD is_valid TINYINT(1) DEFAULT NULL');
        $this->addSql('ALTER TABLE user DROP INDEX UNIQ_8D93D649296CD8AE, ADD INDEX IDX_8D93D649296CD8AE (team_id)');
        $this->addSql('DROP INDEX UNIQ_8D93D649CB944F1A ON user');
        $this->addSql('ALTER TABLE user ADD first_name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, ADD last_name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, ADD secret_key VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, DROP student_id');
        $this->addSql('DROP INDEX IDX_5A07F35ACB944F1A ON valid_challenge');
        $this->addSql('ALTER TABLE valid_challenge DROP student_id');
    }
}

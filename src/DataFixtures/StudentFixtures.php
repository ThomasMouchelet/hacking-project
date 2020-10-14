<?php

namespace App\DataFixtures;

use App\Entity\Student;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class StudentFixtures extends Fixture
{

    const STUDENTS = [
        'student1' => [
            'firstName' => "Alexander",
            'lastName' => "ALLAOU",
        ],
        'student2' => [
            'firstName' => "Vincent",
            'lastName' => "BERRERE",
        ],
        'student3' => [
            'firstName' => "Nassime",
            'lastName' => "BEL HAJ",
        ],
        'student4' => [
            'firstName' => "Aymane",
            'lastName' => "BENYAKHLEF",
        ],
        'student5' => [
            'firstName' => "Viktoriya",
            'lastName' => "BERYOZKO",
        ],
        'student6' => [
            'firstName' => "Elisa",
            'lastName' => "BOURG",
        ],
        'student7' => [
            'firstName' => "Robin",
            'lastName' => "FILFILI",
        ],
        'student8' => [
            'firstName' => "Salomé",
            'lastName' => "GERMAIN",
        ],
        'student9' => [
            'firstName' => "Elsa",
            'lastName' => "LOPEZ",
        ],
        'student10' => [
            'firstName' => "Louis",
            'lastName' => "VALENTE",
        ],
        'student11' => [
            'firstName' => "Lea",
            'lastName' => "ALLEGROTTI",
        ],
        'student12' => [
            'firstName' => "Christelle",
            'lastName' => "ANDERSON",
        ],
        'student13' => [
            'firstName' => "David",
            'lastName' => "BALDOVINI",
        ],
        'student14' => [
            'firstName' => "Louis",
            'lastName' => "BERTIN",
        ],
        'student15' => [
            'firstName' => "Sheetal",
            'lastName' => "BHATI",
        ],
        'student16' => [
            'firstName' => "Alexandre",
            'lastName' => "BOUILLAC",
        ],
        'student17' => [
            'firstName' => "Marion",
            'lastName' => "BOUREUX",
        ],
        'student18' => [
            'firstName' => "Boris",
            'lastName' => "CARETO",
        ],
        'student19' => [
            'firstName' => "Amelie",
            'lastName' => "CHAUVEAU",
        ],
        'student20' => [
            'firstName' => "Marine",
            'lastName' => "CONSTANTIN",
        ],
        'student21' => [
            'firstName' => "Lea",
            'lastName' => "DAUBRESSE-GALLOIS",
        ],
        'student22' => [
            'firstName' => "Axelle",
            'lastName' => "DRAMAIS",
        ],
        'student23' => [
            'firstName' => "Maelle",
            'lastName' => "DUCOURET",
        ],
        'student24' => [
            'firstName' => "Eva",
            'lastName' => "HAOUES",
        ],
        'student25' => [
            'firstName' => "Pauline",
            'lastName' => "LAXALT",
        ],
        'student26' => [
            'firstName' => "Guillaume",
            'lastName' => "LEY",
        ],
        'student27' => [
            'firstName' => "Laura",
            'lastName' => "MERCIER",
        ],
        'student28' => [
            'firstName' => "Manon",
            'lastName' => "MIEUSSET",
        ],
        'student29' => [
            'firstName' => "Samia",
            'lastName' => "MIMANI",
        ],
        'student30' => [
            'firstName' => "Alizé",
            'lastName' => "MOREIRA",
        ],
        'student31' => [
            'firstName' => "Axel",
            'lastName' => "PINHEIRO",
        ],
        'student32' => [
            'firstName' => "Margaux",
            'lastName' => "PIQUEPAILLE",
        ],
        'student33' => [
            'firstName' => "Moana",
            'lastName' => "RENOUX",
        ],
        'student34' => [
            'firstName' => "Marie-Gladys",
            'lastName' => "RIVIEREZ",
        ],
        'student35' => [
            'firstName' => "Gabriel",
            'lastName' => "RUELLO",
        ],
        'student36' => [
            'firstName' => "Dylan",
            'lastName' => "SOUSA DA CUNHA",
        ],
        'student37' => [
            'firstName' => "Paul",
            'lastName' => "VELEZ",
        ],
        'student38' => [
            'firstName' => "Pauline",
            'lastName' => "VESQUE",
        ],
        'student39' => [
            'firstName' => "Florian",
            'lastName' => "VINOT",
        ],
    ];

    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
        foreach (self::STUDENTS as $studentRef => $data) {
            $student = new Student();
            $student->setFirstName($data["firstName"])
                ->setLastName($data["lastName"])
                ->setSecretKey(substr(uniqid(rand(), true), 5, 3));

            $this->addReference($studentRef, $student);
            $manager->persist($student);

            $user = new User();
            $hash = $this->encoder->encodePassword($user, "bootstrap");

            // Supprimer les espaces dans les noms de famille pour le username
            $newLastname = str_replace(" ", "", $data["lastName"]);
            // Première lettre du prenom + . + nom (sans espace) (exemple: t.mouchelet)
            $username = strtolower($data["firstName"][0] . "." . $newLastname);

            $user->setUsername($username)
                ->setPassword($hash)
                ->setStudent($student);

            $manager->persist($user);
        }

        $manager->flush();
    }
}

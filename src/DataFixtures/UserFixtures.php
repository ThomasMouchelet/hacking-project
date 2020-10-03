<?php

namespace App\DataFixtures;

use App\Entity\Team;
use App\Entity\User;
use App\Entity\ValidChallenge;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;


class UserFixtures extends Fixture implements DependentFixtureInterface
{
    private $encoder;

    const USERS = [
        'student1' => [
            'username' => "thomas",
            'student_information' => 'student1'
        ],
        'student2' => [
            'username' => "robert",
            'student_information' => 'student2'
        ],
        'team1' => [
            'username' => "team1",
            'team_information' => 'team1'
        ],
        'team2' => [
            'username' => "team2",
            'team_information' => 'team2'
        ],
    ];

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function getDependencies()
    {
        return [ChallengeFixtures::class, StudentFixtures::class, TeamFixtures::class];
    }

    public function load(ObjectManager $manager)
    {

        // foreach (self::USERS as $userRef => $data) {
        //     $user = new User();
        //     $hash = $this->encoder->encodePassword($user, "bootstrap");

        //     $user->setUsername($data["username"])
        //         ->setPassword($hash);

        //     if (array_key_exists("student_information", $data)) {
        //         $user->setStudent($this->getReference($data["student_information"]));
        //     }
        //     if (array_key_exists("team_information", $data)) {
        //         $user->setTeam($this->getReference($data["team_information"]));
        //     }

        //     $manager->persist($user);
        // }

        // for ($i = 1; $i <= 2; $i++) {
        //     $validChallenge = new ValidChallenge();
        //     $validChallenge->setUser($student)
        //         ->setChallenge($this->getReference("challenge" . $i))
        //         ->setTimeToComplete(new \DateTime());

        //     $manager->persist($validChallenge);
        //     $student->addValidChallenge($validChallenge);
        // }

        // $manager->persist($student);

        $manager->flush();
    }
}

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

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function getDependencies()
    {
        return [ChallengeFixtures::class];
    }

    public function load(ObjectManager $manager)
    {
        $team = new Team();


        $team->setName("thotest");

        $manager->persist($team);

        $student = new User();

        $hash = $this->encoder->encodePassword($student, "bootstrap");
        $student->setFirstName("Thomas")
            ->setUserName('thomas')
            ->setLastName('Mouchelet')
            ->setSecretKey('4863259')
            ->setPassword($hash)
            ->setTeam($team);

        for ($i = 1; $i <= 2; $i++) {
            $validChallenge = new ValidChallenge();
            $validChallenge->setUser($student)
                ->setChallenge($this->getReference("challenge" . $i))
                ->setTimeToComplete(new \DateTime());

            $manager->persist($validChallenge);
            $student->addValidChallenge($validChallenge);
        }

        $manager->persist($student);

        $manager->flush();
    }
}

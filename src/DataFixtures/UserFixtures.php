<?php

namespace App\DataFixtures;

use App\Entity\Team;
use App\Entity\User;
use App\Entity\ValidChallenge;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;


class UserFixtures extends Fixture
{
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
        $user = new User();
        $hash = $this->encoder->encodePassword($user, "cox1988");

        $user->setUsername("mistert")
            ->setPassword($hash)
            ->setRoles(["ROLE_ADMIN"]);

        $manager->persist($user);

        $manager->flush();
    }
}

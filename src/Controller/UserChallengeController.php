<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;


class UserChallengeController extends AbstractController
{
    /** @var ObjectManager */
    public function __construct(Security $security, EntityManagerInterface $em)
    {
        $this->security = $security;
        $this->em = $em;
    }

    public function __invoke(Request $request, UserRepository $userRipo)
    {
        if ($request->isMethod('GET')) {
            $user = $request->get('data');

            $validChallenge = $user->getValidChallenges()->toArray()[0];

            $challenge = $validChallenge->getChallenge()->getId();

            /**
             * TODO : Amélioration à faire 
             * Problème : si les ID ne se suivent pas
             */
            return $challenge + 1;
        }
    }
}

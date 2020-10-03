<?php

namespace App\Controller;

use App\Repository\ChallengeRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;



class UserChallengeController extends AbstractController
{
    private $security;
    private $em;

    /** @var ObjectManager */
    public function __construct(Security $security, EntityManagerInterface $em)
    {
        $this->security = $security;
        $this->em = $em;
    }

    public function __invoke(Request $request, ChallengeRepository $challengeRipo)
    {
        if ($request->isMethod('GET')) {
            $userConnect = $this->security->getUser();
            $count = count($userConnect->getValidChallenges()->toArray());

            $activeChallenge = $challengeRipo->findOneBy(["orderChallenge" => $count + 1]);

            return $activeChallenge->getId();
        }
    }
}

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
            // S'il s'agit d'une team
            if (!is_null($userConnect->getTeam())) {
                $type = "team";
                $countChallenge = count($userConnect->getTeam()->getValidChallenges()->toArray());
            }
            // S'il s'agit d'un étudiant
            if (!is_null($userConnect->getStudent())) {
                $type = "student";
                $countChallenge = count($userConnect->getStudent()->getValidChallenges()->toArray());
            }

            $totalCountChallenge = count($challengeRipo->findBy(['type' => $type]));

            if ($countChallenge >= $totalCountChallenge) {
                return 'complete';
            } else {
                $listChallenge = $challengeRipo->findBy(["type" => $type]);

                return $listChallenge[$countChallenge]->getId();
            }
        }
    }
}

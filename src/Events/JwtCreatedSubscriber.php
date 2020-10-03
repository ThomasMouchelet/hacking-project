<?php

namespace App\Events;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtCreatedSubscriber
{
    public function updateJwtData(JWTCreatedEvent $event)
    {
        // 1. Récupérer l'utilisateur (pour avoir son firstName et lastName)
        $user = $event->getUser();
        // 2. Enrichir les data pour qu'elles contiennent ces données
        $data = $event->getData();

        if (!is_null($user->getTeam())) {
            $data['teamID'] = $user->getTeam()->getId();
            $data['name'] = $user->getTeam()->getName();
        }

        if (!is_null($user->getStudent())) {
            $data['studentID'] = $user->getStudent()->getId();
            $data['firstName'] = $user->getStudent()->getFirstName();
            $data['lastName'] = $user->getStudent()->getLastName();
            $data['secretKey'] = $user->getStudent()->getSecretKey();
            $data['studentTeamID'] = $user->getStudent()->getTeam()->getId();
        }

        $data['id'] = $user->getId();
        $data['username'] = $user->getUsername();

        $event->setData($data);
    }
}

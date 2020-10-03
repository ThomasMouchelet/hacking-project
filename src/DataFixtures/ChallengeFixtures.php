<?php

namespace App\DataFixtures;

use App\Entity\Challenge;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use ApiPlatform\Core\Annotation\ApiResource;

class ChallengeFixtures extends Fixture
{
    const CHALLENGES = [
        'challenge1' => [
            'name' => "L'observation",
            'answer' => "268",
            'description' => "Bonjour TOI
                                <br><br>
                                L'une des principales qualité d'un hackeur est l'observation. Avez-vous bien analysé l'ensemble du lieu où vous vous trouvez ?
                                <br>
                                Pour atteindre l'étape 2, vous devrez trouver et renseigner un code à 3 chiffres dans le champs ci-dessous.
                                <br><br>
                                Voici un indice, mais ne vous y habituez pas.
                                <br><br>
                                <em>“Le sombre ciel du studio photo vous fera faire la connexion”</em>",
            'orderChallenge' => "1",
            'type' => 'student'
        ],
        'challenge2' => [
            'name' => "Social engineering",
            'answer' => "0609307037",
            'description' => "Toujours là, TOI ?
                                <br><br>
                                Avez-vous entendu parler du social engineering ? <br> Un bon hacker sait <em>où</em> et <em>comment</em> trouver une information. 
                                <br>
                                Pour atteindre l'étape suivante, écoutez ce message audio.
                                <br><br> 
                                            Your browser does not support the
                                            <code>audio</code> element.
                                    </audio>
                                <br><br>
                                Vous avez trouvé l'information demandée ? Rentrez-la ci-dessous.",
            'orderChallenge' => "2",
            'type' => 'student'
        ],
        'challenge3' => [
            'name' => "F12",
            'answer' => "slacker",
            'description' => "Vous tenez le coup, TOI ? 
                <br><br>
                Ce n'est pourtant pas si compliqué…
                <br><br> 
                Restons simple avant de passer à l'étape 5, je pense que ça se passe de commentaire.
                <!-- TODO : faire en sorte que l'étudiant trouve le commentaire >> slacker -->
            ",
            'orderChallenge' => "3",
            'type' => 'student'
        ],
        'challenge4' => [
            'name' => "Test oculaire",
            'answer' => "#00ff00",
            'description' => "
                Eh bien, nous pouvons enfin commencer {{team.name}} !
                <br><br>
                Un premier test facile, pour identifier qui sera le leader de cette équipe :
                <br><br>
                “Vous me voyez depuis le début, d'ailleurs je suis plutôt voyant. A vous de me trouver et de me rentrer Hexa-ctement”

            ",
            'orderChallenge' => "4",
            'type' => 'team'
        ],
        'challenge5' => [
            'name' => "Rain Man",
            'answer' => "45",
            'description' => "
                Vous semblez prendre du bon temps, vous avez pris des couleurs dirait-on.
                <br><br>
                Passons au calcul, pouvez-vous me résoudre cette équation :
                <br><br>

                (le board + war room)² x (la régie + le lab)<br>
                _________________________________<br>
                le board + war room<br>
            ",
            'orderChallenge' => "5",
            'type' => 'team'
        ],
    ];

    public function load(ObjectManager $manager)
    {
        foreach (self::CHALLENGES as $challengeRef => $data) {
            $challenge = new Challenge();
            $challenge->setName($data["name"])
                ->setAnswer($data["answer"])
                ->setDescription($data["description"])
                ->setType($data['type'])
                ->setOrderChallenge($data['orderChallenge']);

            $this->addReference('challenge' . $data['orderChallenge'], $challenge);
            $manager->persist($challenge);
        }

        $manager->flush();
    }
}

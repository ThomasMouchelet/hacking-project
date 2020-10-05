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
            'description' => "Bonjour {namingGame}
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
            'description' => "
                Toujours là, {namingGame} ?
                <br><br>
                Avez-vous entendu parler du social engineering ? <br> Un bon hacker sait <em>où</em> et <em>comment</em> trouver une information. 
                <br>
                Pour atteindre l'étape suivante, écoutez ce message audio.
                <br><br> 
                <audio controls>
                    <source src=\"http://4graphik.com/codecamp/app/sound/mistert.wav\" type=\"audio/ogg\" />
                    <source src=\"http://4graphik.com/codecamp/app/sound/mistert.wav\" type=\"audio/mpeg\" />
                            Your browser does not support the audio element.
                </audio>
                <br><br>
                Vous avez trouvé l'information demandée ? Rentrez-la ci-dessous.",
            'orderChallenge' => "2",
            'type' => 'student'
        ],
        'challenge3' => [
            'name' => "Advertising",
            'answer' => "advertising next generation",
            'description' => "
                Celle-ci est cadeau, mais il est toujours bon de savoir qui est susceptible de nous observer. 
                <br><br>
                Pour atteindre l'étape suivante, répondez à cette question : 
                <br><br>
                <em>\"Quelle est la baseline de l’ESP ?\"</em>
            ",
            'orderChallenge' => "3",
            'type' => 'student'
        ],
        'challenge4' => [
            'name' => "F12",
            'answer' => "slacker",
            'description' => "
                Vous tenez le coup, {namingGame} ? 
                <br><br>
                Ce n'est pourtant pas si compliqué…
                <br><br> 
                Restons simple avant de passer à l'étape 5, je pense que ça se passe de commentaire.
                <!-- TODO : faire en sorte que l'étudiant trouve le commentaire >> slacker -->
            ",
            'orderChallenge' => "4",
            'type' => 'student'
        ],
        'challenge5' => [
            'name' => "Piste verte",
            'answer' => "rossignol",
            'description' => "
                Toujours à l'affût des nouvelles technologies et de leurs possibilités, un hacker doit également être en mesure de les utiliser.
                <br><br>  
                Si vous n'aimez pas la manière dont le babyfoot est disposé, retournez-le.
            ",
            'orderChallenge' => "5",
            'type' => 'student'
        ],
        'challenge6' => [
            'name' => "Dev-joke",
            'answer' => "mrtdominera",
            'description' => "
               <div id=\"MrTdominera\">
                Cher {namingGame}, j'espère que ces quelques aller-retours vous ont dégourdi les jambes. 
                <br><br>
                Au risque que cela vous semble répétitif, il est important d'avoir de la <em>.class</em>
                <br>
                Mais la réponse que vous cherchez nécessite quelque chose de bien plus <em>#unique</em>
                </div>
            ",
            'orderChallenge' => "6",
            'type' => 'student'
        ],
        'challenge7' => [
            'name' => "Pas mal",
            'answer' => "team",
            'description' => "
               Vous avez fait vos preuves {namingGame}, de toute évidence.
                <br><br>
                Mais de ce que j'ai pu observer, vous ne vous en sortirez pas sans aide pour la tâche que j'ai à vous confier. 
                <br><br>
                C'est pourquoi vous allez devoir rejoindre une team, une équipe composée de hackers comme vous. 
                <br><br>
                Dorénavant vos destins sont liés, et l'entraide sera le maître mot.
                <br>
                Avant toute chose, notez bien le code suivant, il vous sera rapidement nécessaire :
                <br><br>
                <strong>{{student.secretKey}}</strong>
                <br><br>
                A présent, rejoignez-moi dans un espace sécurisé pour constituer votre équipe.
                <br> 
                Vous commencez à avoir l'habitude... inspectez et trouvez simplement quel lien suivre.
                <br><br>
                <a href=\"/#/create_team\" id=\"link\" style=\"display: none;\" target=\"_blank\">C'est bien ici !</a>
            ",
            'orderChallenge' => "7",
            'type' => 'student'
        ],
        'challenge8' => [
            'name' => "Test oculaire",
            'answer' => "#00ff00",
            'description' => "
                Eh bien, nous pouvons enfin commencer {namingGame} !
                <br><br>
                Un premier test facile, pour identifier qui sera le leader de cette équipe :
                <br><br>
                “Vous me voyez depuis le début, d'ailleurs je suis plutôt voyant. A vous de me trouver et de me rentrer Hexa-ctement”
            ",
            'orderChallenge' => "8",
            'type' => 'team'
        ],
        'challenge9' => [
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
            'orderChallenge' => "9",
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

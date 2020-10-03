<?php

namespace App\DataFixtures;

use App\Entity\Team;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class TeamFixtures extends Fixture
{
    const TEAMS = [
        'team1' => [
            'name' => "team1"
        ],
        'team2' => [
            'name' => "team2"
        ],
    ];

    public function getDependencies()
    {
        return [StudentFixtures::class];
    }

    public function load(ObjectManager $manager)
    {

        $totalStudents = 39;
        $studentWithTeam = [];

        for ($i = 0; $i < 13; $i++) {
            $team = new Team();
            $studentsInTeam = [];
            for ($s = 0; $s < 3; $s++) {
                $selectedStudent = null;

                while (in_array($selectedStudent, $studentWithTeam) || $selectedStudent === null) {
                    $selectedStudent = rand(1, $totalStudents);
                }
                if (!in_array($selectedStudent, $studentWithTeam)) {
                    $student = $this->getReference("student" . $selectedStudent);
                    array_push($studentWithTeam, $selectedStudent);
                    array_push($studentsInTeam, $student);
                }
            }

            $teamName = "";
            $teamSecret = "";
            foreach ($studentsInTeam as $key => $student) {
                $firsName = substr(strtolower(str_replace(" ", "", $student->getFirstName())), 0, 3);
                $teamName .= $firsName;
                $teamSecret .= substr($studentsInTeam[0]->getSecretKey(), 0, 3);
            };
            $team->setName($teamName);
            $team->setSecretKey($teamSecret);

            $manager->persist($team);
        }

        $manager->flush();
    }
}

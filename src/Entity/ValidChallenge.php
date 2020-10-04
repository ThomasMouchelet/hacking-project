<?php

namespace App\Entity;

use App\Repository\ValidChallengeRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=ValidChallengeRepository::class)
 * @ApiResource
 */
class ValidChallenge
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"students_read","teams_read"})
     */
    private $id;

    /**
     * @ORM\JoinColumn(referencedColumnName="id", nullable=true)
     * @ORM\ManyToOne(targetEntity=Team::class, inversedBy="validChallenges")
     */
    private $team;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"students_read","teams_read"})
     */
    private $timeToComplete;

    /**
     * @ORM\ManyToOne(targetEntity=Challenge::class, inversedBy="validChallenges")
     * @ORM\OrderBy({"orderChallenge" = "DESC"})
     * @Groups({"students_read","teams_read"})
     */
    private $challenge;

    /**
     * @ORM\JoinColumn(referencedColumnName="id", nullable=true)
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="validChallenges")
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity=Student::class, inversedBy="validChallenges")
     */
    private $student;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTeam(): ?Team
    {
        return $this->team;
    }

    public function setTeam(?Team $team): self
    {
        $this->team = $team;

        return $this;
    }


    public function getTimeToComplete(): ?\DateTimeInterface
    {
        return $this->timeToComplete;
    }

    public function setTimeToComplete(\DateTimeInterface $timeToComplete): self
    {
        $this->timeToComplete = $timeToComplete;

        return $this;
    }

    public function getChallenge(): ?Challenge
    {
        return $this->challenge;
    }

    public function setChallenge(?Challenge $challenge): self
    {
        $this->challenge = $challenge;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getStudent(): ?Student
    {
        return $this->student;
    }

    public function setStudent(?Student $student): self
    {
        $this->student = $student;

        return $this;
    }
}

<?php

namespace App\Entity;

use App\Repository\TeamRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=TeamRepository::class)
 * @ApiResource(
 * normalizationContext={
 *     "groups"={"teams_read"}
 *  },
 *  normalizationContext={"groups"={"teams_read"}},
 *  denormalizationContext={"disable_type_enforcement"=true}
 * )
 */
class Team
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"teams_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"teams_read"})
     */
    private $name;

    /**
     * @ORM\OneToMany(targetEntity=ValidChallenge::class, mappedBy="team")
     * @Groups({"teams_read"})
     */
    private $validChallenges;

    /**
     * @ORM\OneToOne(targetEntity=User::class, mappedBy="team", cascade={"persist", "remove"})
     */
    private $user;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"teams_read"})
     */
    private $secretKey;

    /**
     * @ORM\OneToMany(targetEntity=Student::class, mappedBy="team")
     * @Groups({"teams_read"})
     * @ApiSubResource()
     */
    private $students;


    public function __construct()
    {
        $this->users = new ArrayCollection();
        $this->students = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }


    /**
     * @return Collection|ValidChallenge[]
     */
    public function getValidChallenges(): Collection
    {
        return $this->validChallenges;
    }

    public function addValidChallenge(ValidChallenge $validChallenge): self
    {
        if (!$this->validChallenges->contains($validChallenge)) {
            $this->validChallenges[] = $validChallenge;
            $validChallenge->setTeam($this);
        }

        return $this;
    }

    public function removeValidChallenge(ValidChallenge $validChallenge): self
    {
        if ($this->validChallenges->contains($validChallenge)) {
            $this->validChallenges->removeElement($validChallenge);
            // set the owning side to null (unless already changed)
            if ($validChallenge->getTeam() === $this) {
                $validChallenge->setTeam(null);
            }
        }

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        // set (or unset) the owning side of the relation if necessary
        $newTeam = null === $user ? null : $this;
        if ($user->getTeam() !== $newTeam) {
            $user->setTeam($newTeam);
        }

        return $this;
    }

    public function getSecretKey(): ?string
    {
        return $this->secretKey;
    }

    public function setSecretKey(?string $secretKey): self
    {
        $this->secretKey = $secretKey;

        return $this;
    }

    /**
     * @return Collection|Student[]
     */
    public function getStudents(): Collection
    {
        return $this->students;
    }

    public function addStudent(Student $student): self
    {
        if (!$this->students->contains($student)) {
            $this->students[] = $student;
            $student->setTeam($this);
        }

        return $this;
    }

    public function removeStudent(Student $student): self
    {
        if ($this->students->contains($student)) {
            $this->students->removeElement($student);
            // set the owning side to null (unless already changed)
            if ($student->getTeam() === $this) {
                $student->setTeam(null);
            }
        }

        return $this;
    }
}

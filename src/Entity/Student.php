<?php

namespace App\Entity;

use App\Repository\StudentRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;

/**
 * @ORM\Entity(repositoryClass=StudentRepository::class)
 * @ApiResource
 */
class Student
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $firstName;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $lastName;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $secretKey;

    /**
     * @ORM\OneToMany(targetEntity=ValidChallenge::class, mappedBy="student")
     */
    private $validChallenges;

    /**
     * @ORM\OneToOne(targetEntity=User::class, mappedBy="student", cascade={"persist", "remove"})
     */
    private $user;

    public function __construct()
    {
        $this->validChallenges = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(?string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(?string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getSecretKey(): ?string
    {
        return $this->secretKey;
    }

    public function setSecretKey(string $secretKey): self
    {
        $this->secretKey = $secretKey;

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
            $validChallenge->setStudent($this);
        }

        return $this;
    }

    public function removeValidChallenge(ValidChallenge $validChallenge): self
    {
        if ($this->validChallenges->contains($validChallenge)) {
            $this->validChallenges->removeElement($validChallenge);
            // set the owning side to null (unless already changed)
            if ($validChallenge->getStudent() === $this) {
                $validChallenge->setStudent(null);
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
        $newStudent = null === $user ? null : $this;
        if ($user->getStudent() !== $newStudent) {
            $user->setStudent($newStudent);
        }

        return $this;
    }
}

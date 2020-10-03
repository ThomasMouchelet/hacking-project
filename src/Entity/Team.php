<?php

namespace App\Entity;

use App\Repository\TeamRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;

/**
 * @ORM\Entity(repositoryClass=TeamRepository::class)
 * @ApiResource
 */
class Team
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $isValid;

    /**
     * @ORM\OneToMany(targetEntity=ValidChallenge::class, mappedBy="team")
     */
    private $validChallenges;

    /**
     * @ORM\OneToMany(targetEntity=User::class, mappedBy="team")
     */
    private $users;



    public function __construct()
    {
        $this->validChallenges = new ArrayCollection();
        $this->users = new ArrayCollection();
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

    public function getIsValid(): ?bool
    {
        return $this->isValid;
    }

    public function setIsValid(?bool $isValid): self
    {
        $this->isValid = $isValid;

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

    /**
     * @return Collection|User[]
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users[] = $user;
            $user->setTeam($this);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->contains($user)) {
            $this->users->removeElement($user);
            // set the owning side to null (unless already changed)
            if ($user->getTeam() === $this) {
                $user->setTeam(null);
            }
        }

        return $this;
    }
}

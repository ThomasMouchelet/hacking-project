<?php

namespace App\Entity;

use App\Repository\ChallengeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=ChallengeRepository::class)
 * @ApiResource
 */
class Challenge
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"teams_read"})
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $answer;

    /**
     * @ORM\Column(type="text")
     */
    private $description;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"teams_read"})
     */
    private $orderChallenge;

    /**
     * @ORM\OneToMany(targetEntity=ValidChallenge::class, mappedBy="challenge")
     */
    private $validChallenges;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $type;

    public function __construct()
    {
        $this->validChallenges = new ArrayCollection();
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

    public function getAnswer(): ?string
    {
        return $this->answer;
    }

    public function setAnswer(string $answer): self
    {
        $this->answer = $answer;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getOrderChallenge(): ?int
    {
        return $this->orderChallenge;
    }

    public function setOrderChallenge(int $orderChallenge): self
    {
        $this->orderChallenge = $orderChallenge;

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
            $validChallenge->setChallenge($this);
        }

        return $this;
    }

    public function removeValidChallenge(ValidChallenge $validChallenge): self
    {
        if ($this->validChallenges->contains($validChallenge)) {
            $this->validChallenges->removeElement($validChallenge);
            // set the owning side to null (unless already changed)
            if ($validChallenge->getChallenge() === $this) {
                $validChallenge->setChallenge(null);
            }
        }

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(?string $type): self
    {
        $this->type = $type;

        return $this;
    }
}

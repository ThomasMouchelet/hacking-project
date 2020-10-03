<?php

namespace App\Repository;

use App\Entity\ValidChallenge;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ValidChallenge|null find($id, $lockMode = null, $lockVersion = null)
 * @method ValidChallenge|null findOneBy(array $criteria, array $orderBy = null)
 * @method ValidChallenge[]    findAll()
 * @method ValidChallenge[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ValidChallengeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ValidChallenge::class);
    }

    // /**
    //  * @return ValidChallenge[] Returns an array of ValidChallenge objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('v')
            ->andWhere('v.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('v.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ValidChallenge
    {
        return $this->createQueryBuilder('v')
            ->andWhere('v.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}

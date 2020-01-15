

const newLinkSubscribe =(parent , args , context) => {
        return context.prisma.$subscribe.link({mutation_in: ['CREATED']}).node()
}
const newVoteSubscribe = (parent , args , context ) => {
    return context.prisma.$subscribe.vote({mutation_in: ['CREATED']}).node()
}
export const newLink = {
    subscribe: newLinkSubscribe,
    resolve: payload => {
        return payload
    }
}
export const newVote = {
    subscribe: newVoteSubscribe,
    resolve: payload => {
        return payload
    }
}
  